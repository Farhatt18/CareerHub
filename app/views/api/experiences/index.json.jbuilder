@experiences.each do |experience|
  json.set! experience.id do 
    json.extract! experience, :id, :user_id, :title, :company_name, :employment_type, :location, :start_date, :end_date, :description
  end
end