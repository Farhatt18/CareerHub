json.array! @comments  do |comment|
  json.extract! comment, :id, :user_id, :post_id, :parent_comment_id, :body, :created_at
end