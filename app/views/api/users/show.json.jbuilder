json.user do
  json.extract! @user, :id, :email, :username, :fname, :lname, :created_at, :updated_at
  json.photoUrl @user.photo.attached? ? @user.photo.url : "https://careerhub-fsp-seeds.s3.amazonaws.com/1c5u578iilxfi4m4dvc4q810q.svg"
  json.coverPic @user.cover_pic.attached? ? @user.cover_pic.url : "https://careerhub-fsp-seeds.s3.amazonaws.com/55k1z8997gh8dwtihm11aajyq.svg"
end

json.experiences do 
  @user.experiences.each do |experience|
    if experience.present? 
      json.set! experience.id do 
        json.extract! experience, :id, :user_id, :title, :company_name, :employment_type, :location, :start_date, :end_date, :description
      end
    end
  end
end
