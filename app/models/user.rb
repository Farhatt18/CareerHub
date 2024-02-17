class User < ApplicationRecord
  has_secure_password
  has_one_attached :photo, dependent: :destroy
  validates :username,
    uniqueness: true,
    length: { in: 3..40 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email,
    uniqueness: true,
    length: { in: 3..100 },
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true
  validates :fname, :lname, presence: true

  before_validation :ensure_session_token


  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :experiences, dependent: :destroy

  def self.find_by_credentials(credential, password)
    if credential =~ URI::MailTo::EMAIL_REGEXP
      user = User.find_by(email: credential)
    else
      user = User.find_by(username: credential)
    end

    return false unless user

    if user && user.authenticate(password)
      user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save
    self.session_token
  end

  private
  def generate_session_token
    while true
      token = SecureRandom::urlsafe_base64
      if User.exists?(session_token: token)
        token = SecureRandom::urlsafe_base64
      end
      return token
    end
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end


end
