class Api::CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render :index
  end

  # def create
  #   @comment = Comment.new(comment_params)
  #   if @comment.save 
  #     render :show
  #   else  
  #     render json: {errors: @comment.errors.full_messages}, status: 422
  #   end
  # end

  def create
    @comment = Comment.new(comment_params)
    puts "Comment Params: #{comment_params.inspect}"
  
    if @comment.save 
      render :show
    else  
      errors = @comment.errors.full_messages
      puts "Validation errors: #{errors.join(', ')}"
      render json: { errors: errors, comment_params: comment_params }, status: 422
    end
  end
  

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render :show
    else 
      render json:{errors: @comment.errors.full_messages}, status: 422
    end
  end

  def show 
    @comment = Comment.find_by(id: params[:id])

    if(@comment)
      render :show 
    else 
      render json: {errors: @comment.errors.full_messages}, status: 404
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render :index
    else 
      render plain: "You can't destroy what's not there."
    end
  end

  private 
  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :parent_comment_id, :body)
  end
end
