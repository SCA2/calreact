class Appointment < ApplicationRecord
  validates :title, :appt_time, presence: true
  validates :title, length: { minimum: 3 }
  validate :appt_time_cannot_be_in_the_past

  belongs_to :user
private
  
  def appt_time_cannot_be_in_the_past
    if appt_time.present? && appt_time < Time.now()
      errors.add(:appt_time, "can't be in the past")
    end
  end
end
