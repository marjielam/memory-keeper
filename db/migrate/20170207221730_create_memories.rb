class CreateMemories < ActiveRecord::Migration[5.0]
  def change
    create_table :memories do |t|
      t.belongs_to :day, null: false
      t.string :body, null: false
    end
  end
end
