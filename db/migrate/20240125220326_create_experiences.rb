class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.string :title, null: false
      t.string :company_name, null: false
      t.string :employment_type 
      t.string :location
      t.date :start_date, null: false
      t.date :end_date
      t.text :description

      t.timestamps
    end
  end
end
