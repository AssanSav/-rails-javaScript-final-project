class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :category
      t.string :image_url
      t.string :ingredient1
      t.string :unit1
      t.string :ingredient2
      t.string :unit2
      t.string :ingredient3
      t.string :unit3
      t.string :ingredient4
      t.string :unit4
      t.string :ingredient5
      t.string :unit5
      t.string :ingredient6
      t.string :unit6
      t.string :directions
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
