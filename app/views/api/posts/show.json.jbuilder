
  json.extract! @post, :id, :user_id, :body, :created_at
  json.photoUrl @post.photo.attached? ? @post.photo.first.url : nil
