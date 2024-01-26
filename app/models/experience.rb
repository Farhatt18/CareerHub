class Experience < ApplicationRecord
  belongs_to :user
  validates :title, :company_name, :location, :start_date, presence: true
end
