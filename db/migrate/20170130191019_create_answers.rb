class CreateAnswers < ActiveRecord::Migration[5.0]
  def change
    create_table :answers do |t|
      t.belongs_to :day, null: false
      t.belongs_to :question, null: false
      t.text :body
      t.timestamps
    end
  end
end
