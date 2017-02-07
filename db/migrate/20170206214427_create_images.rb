class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.belongs_to :day, null: false
      t.string :image_url, null: false
    end
  end
end
