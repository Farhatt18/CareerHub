
  json.extract! @post, :id, :user_id, :body, :created_at
  json.photoUrl @post.photos.attached? ? @post.photos.first.url : nil
