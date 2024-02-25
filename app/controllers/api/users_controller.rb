class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'fname', 'lname', 'photo', "cover_pic"]
  def create
    @user = User.create(user_params)
    if @user.save!
      login!(@user)
      render :show
    else 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index 
    @users = User.all 
    render :index
  end

  def show 
    @user = User.find(params[:id])
    if @user 
      render :show 
    else
      render json: { errors: @user.errors.full_messages }, status: 404
    end
  end



  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

  private

  def user_params
    # debugger
    params.require(:user).permit(:email, :username, :password, :fname, :lname, :photo, :cover_pic)
  end
end
