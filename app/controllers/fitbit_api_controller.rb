class FitbitApiController < ApplicationController

  # before_filter :authenticate_user!

  def data_request
    current_user = User.find(params[:user_id])
    client = current_user.fitbit_client
    case params[:resource]
      when 'calories'; output = client.activity_time_series(resource: 'calories', start_date: params[:date], period: '1d')
      when 'sleep'; output = client.sleep_logs(params[:date])
      when 'steps'; output = client.activity_time_series(resource: 'steps', start_date: params[:date], period: '1d')
    end
    render json: output
  end
end
