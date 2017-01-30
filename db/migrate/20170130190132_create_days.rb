class CreateDays < ActiveRecord::Migration[5.0]
  def change
    create_table :days do |t|
      t.belongs_to :user, null: false
      t.date :date, null: false
      t.timestamps
    end

    add_index :days, :date, unique: true
  end
end
