
  json.extract! @post, :id, :user_id, :body, :created_at
  json.author  do 
    json.fname @post.user.fname
    json.lname @post.user.lname
    
  end
  json.photoUrl @post.photo.attached? ? @post.photo.url : nil
