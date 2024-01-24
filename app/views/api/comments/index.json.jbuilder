# json.comments do
  @comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :user_id, :post_id, :parent_comment_id, :body, :user
      json.user do 
        json.fname comment.user.fname
        json.lname comment.user.lname
      end
    end 
  end
# end

