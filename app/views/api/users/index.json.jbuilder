@users.each do |user|
  json.set! user.id do
    json.extract! @user, :id, :email, :username, :fname, :lname, :created_at, :updated_at
    json.photoUrl user.photo.attached? ? user.photo.url : "https://careerhub-fsp-seeds.s3.amazonaws.com/1c5u578iilxfi4m4dvc4q810q.svg"
    json.coverPic @user.cover_pic.attached? ? @user.cover_pic.url : "https://careerhub-fsp-seeds.s3.amazonaws.com/55k1z8997gh8dwtihm11aajyq.svg"
  end 
end


