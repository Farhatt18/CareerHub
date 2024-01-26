class Experience < ApplicationRecord
  belongs_to :user
  validates :title, :company_name, :location,  presence: true
  validates :start_date, :end_date, presence: true, format: { with: /\A\d{4}-\d{2}-\d{2}\z/, message: "should be in the format YYYY-MM-DD" }
  validate :end_date_after_start_date

def end_date_after_start_date
  return if end_date.blank? || start_date.blank?

  errors.add(:end_date, "must be after start date") if end_date < start_date
end
end
