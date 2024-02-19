class Api::ExperiencesController < ApplicationController
  wrap_parameters include: Experience.attribute_names + ['title', 'companyName', 'location', 'employmentType', 'startDate', 'endDate', 'description']
  # protect_from_forgery with: :null_session
  def index
    @experiences = Experience.where(user_id: params[:user_id])   

    render :index
  end

  def create
    @experience = Experience.new(experience_params)
    @experience.user_id = current_user.id
    @user = current_user

    if @experience.save
      render "api/users/show"
    else
      render json: { errors: @experience.errors.full_messages }, status: :unprocessable_entity
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
      @user = User.find_by(id: params[:user_id])
      if @user
        render '/api/users/show'
      else
        render plain: "User not found"
      end
    else
      render plain: "You can't destroy what's not there"
    end
  end
  
  
  

  def experience_params
    params.require(:experience).permit(:title, :company_name, :employment_type, :location, :start_date, :end_date, :description)
  end
end
