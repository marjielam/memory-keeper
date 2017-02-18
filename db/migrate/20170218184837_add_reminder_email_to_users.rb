class AddReminderEmailToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :reminder_email, :boolean, default: false
  end
end
