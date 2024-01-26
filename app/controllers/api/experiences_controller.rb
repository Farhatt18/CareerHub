class Api::ExperiencesController < ApplicationController
  def index
    @experiences = Experience.where(user_id: params[:user_id])   

    render :index
  end

  # def create
  #   @experience = Experience.new(experience_params)
  #   @experience.user_id = current_user.id
  #   @user = current_user

  #   if @experience.save
  #     render '/api/users/show'
  #   else 
  #     render json:{errors: @experience.errors.full_messages}, status: 422
  #   end
  # end

  # In your controller
def create
  @experience = Experience.new(experience_params)
  @experience.user_id = current_user.id

  if @experience.valid?
    @experience.save
    render '/api/users/show'
  else
    render json: { errors: @experience.errors.full_messages }, status: 422
  end
end


  def update
    @experience = Experience.find(params[:id])
    if @experience.update(experience_params)
      render '/api/users/show'
    else
      render json: {errors: @experience.errors.full_messages}, status:422
    end
  end

  def destroy
    @experience = Experience.find(params[:id])
    if @experience.destroy
      render '/api/users/show'
    else
      render plain: "You can't destroy what's not there"
    end
  end


  def experience_params
    params.require(:experience).permit(:user_id, :title, :company_name, :employment_type, :location, :start_date, :end_date, :description)
  end
end
