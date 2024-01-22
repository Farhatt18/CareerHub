# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Post.destroy_all
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    fname: "Demo",
    lname: 'Lition',
    password: 'password'
  )


  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      fname: Faker::Name.first_name,
      lname: Faker::Name.last_name,
      password: 'password'
    }) 
  end

  puts "Done!"

  puts "Creating posts..."
  post1 = Post.create!(
    user_id: 1,
    body: "Excited to join the local running club!"
)

  post1.photo.attach(
    io: URI.open("https://careerhub-fsp-seeds.s3.amazonaws.com/business-3d-businesswoman-stepping-up-on-a-pile-of-gold-near-a-chart-showing-financial-growth.png"), 
    filename:"random"
  )

  Post.create!(
      user_id: 2,
      body: "Just completed a thrilling mountain biking trail!",
  )

  Post.create!( 
      user_id: 3,
      body: "Thrilled to announce that our team successfully launched a new product today! 🚀 Kudos to everyone who contributed to this achievement. Exciting times ahead! #ProductLaunch #TeamWork",
  )
  
  Post.create!(
    user_id: 4,
    body: "Had a fantastic time representing our company at the industry conference. Engaging discussions, insightful sessions, and valuable connections made. Looking forward to implementing some great ideas! #Networking #IndustryEvent",
  )

  Post.create!(
    user_id: 5,
    body: "Celebrating a major milestone today! 🎉 Our project team just hit a record-breaking deadline, and I'm proud of the dedication and hard work everyone put in. Onwards and upwards! #Milestone #TeamSuccess",
  )

  Post.create!(
    user_id: 6,
    body: "Just wrapped up an insightful webinar on [Industry Trend]. Grateful for the opportunity to share knowledge and learn from industry experts. Let's keep the conversation going! #Webinar #ProfessionalDevelopment",
  )

  Post.create!(
    user_id: 7,
    body: "Reflecting on the importance of continuous learning in my career journey. Recently completed [Course/Training] and gained valuable skills. What's your go-to resource for professional development? #LearningJourney #CareerGrowth",
  )

  Post.create!(
    user_id: 8,
    body: "Excited to share that I've joined a passionate community of [Your Industry] professionals. Looking forward to networking and collaborating with inspiring individuals! #ProfessionalCommunity",
  )

  Post.create!(
    user_id: 9,
    body: "Spent the day volunteering with an amazing team at [Volunteer Organization]. Grateful for the opportunity to give back to the community. #VolunteerWork #CommunityService",
  )

  Post.create!(
    user_id: 10,
    body: "Just published a new blog post on [Industry Topic]. Sharing insights and perspectives – check it out and let me know your thoughts! #BlogPost #ThoughtLeadership",
  )

