# json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :user_id, :post_id, :parent_comment_id, :body
    end
  end
# end

