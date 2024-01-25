class CreateExperiences < ActiveRecord::Migration[7.0]
  def change
    create_table :experiences do |t|
      t.integer  :user_id, null: false
      t.string :title, null: false
      t.string :company_name, null: false
      t.string :employment_type 
      t.string :location, null: false
      t.date :start_date, null: false
      t.date :end_date
      t.text :description

      t.timestamps
    end
  end
end
