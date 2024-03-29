class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :user, null: false, foreign_key: true, index: true
      t.references :post, null: false, foreign_key: true, index: true
      t.references :parent_comment, foreign_key: { to_table: :comments }
      t.text :body, null: false 

      t.timestamps
    end
  end
end
