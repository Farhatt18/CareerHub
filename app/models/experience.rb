class Experience < ApplicationRecord
  belongs_to :user
  validates :title, :company_name, :start_date, :employment_type, presence: true
  validate :end_date_after_start_date, if: -> { end_date.present? }


  def end_date_after_start_date
    if end_date <= start_date
      errors.add(:end_date, "must be after start date")
    end
  end
end
