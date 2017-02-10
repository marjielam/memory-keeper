class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.belongs_to :day, null: false
      t.string :url, null: false
      t.string :label
      t.string :comment
    end
  end
end
