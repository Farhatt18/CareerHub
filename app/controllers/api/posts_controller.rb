class Api::PostsController < ApplicationController
  def index
    @posts = if params[:user_id]
      Post.where(user_id: params[:user_id])
    else
      Post.all 
    end    
    render  :index
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id 
    if @post.save
      render :show
    else
      render json:{errors: @post.errors.full_messages}, status: 422
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render :show
    else
      render json: {errors: @post.errors.full_messages}, status: 422
    end
  
  end

  def show
    @post = Post.find_by(is: params[:id])

    if(@post)
      render :show
    else
      render json: {errors: @post.errors.full_messages}, status: 404
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      render :index
    else
      render plain: "You can't destroy what's not there."
    end
  end

  private 
  def post_params
    params.require(:post).permit(:user_id, :body)
  end
end
