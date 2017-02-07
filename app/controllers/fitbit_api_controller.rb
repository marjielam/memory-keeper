class FitbitApiController < ApplicationController
  def data_request
    current_user = User.find(params[:user_id])
    client = current_user.fitbit_client
    if current_user.token_expired?
      new_tokens = client.refresh_access_token(current_user.refresh_token)
      current_user.access_token = new_tokens["access_token"]
      current_user.refresh_token = new_tokens["refresh_token"]
      current_user.expires_at = new_tokens["expires_in"] + Time.now.to_i
    end
    case params[:resource]
    when 'calories'
      output = client.activity_time_series(
        resource: 'calories',
        start_date: params[:date],
        period: '1d'
      )
    when 'sleep'
      output = client.sleep_logs(params[:date])
    when 'steps'
      output = client.activity_time_series(
        resource: 'steps',
        start_date: params[:date],
        period: '1d'
      )
    end
    render json: output
  end
end
