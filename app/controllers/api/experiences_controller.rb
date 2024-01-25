class Api::ExperiencesController < ApplicationController
  def index
    @experiences = Experience.all
  end

  def create
    @experience = Experience.new(experience_params)
    @experience.user_id = current_user.id

    if @experience.save
      render :show
    else 
      render json:{errors: @post.errors.full_messages}, status: 422
    end
  end

  def update
    @experience = Experience.find(params[:id])
    if @experience.update(experience_params)
      render :show
    else
      render json: {errors: @experience.errors.full_messages}, status:422
    end
  end

  def detroy
    @experience = Experience.find(params[:id])
    if @experience.destroy
      render :index
    else
      render plain: "You can't destroy what's not there"
    end
  end

  private 
  def experience_params
    params.require(:experience).permit(:user_id, :title, :company_name, :employment_type, :location, :start_date, :end_date, :description)
  end
end
