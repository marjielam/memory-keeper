class FixIndexes < ActiveRecord::Migration[5.0]
  def up
    remove_index :days, :date
    add_index :days, [:date, :user_id], unique: true
    add_index :answers, [:day_id, :question_id], unique: true
  end

  def down
    add_index :days, :date, unique: true
    remove_index :days, [:date, :user_id]
    remove_index :answers, [:day_id, :question_id]
  end
end
