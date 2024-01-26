json.user do
  json.extract! @user, :id, :email, :username, :fname, :lname, :created_at, :updated_at
  json.experiences do 
    @user.experiences.each do |experience|
      json.set! experience.id do 
        json.extract! experience, :id, :user_id, :title, :company_name, :employment_type, :location, :start_date, :end_date, :description
      end
    end
  end
end
