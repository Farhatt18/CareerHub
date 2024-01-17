class Api::PostsController < ApplicationController
  # def index
  #   @posts = Post.
  #   render  :index
  # end

  def create
    @post = Post.new(post_params)
    if @post.save!
      render :show
    else
      render json:{errors: @post.errors.full_messages}, status: :unprocessable_entity
    end
  end

  # def update
  #   @post = Post.find(params[:id])
    
  
  # end

  # def show
  #   @post = Post.find_by(is: params[:id])
  #   render :show
  # end

  # def destroy

  # end

  private 
  def post_params
    params.require(:post).permit(:user_id, :body)
  end
end
