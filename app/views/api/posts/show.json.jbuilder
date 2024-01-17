json.post do 
  json.extract! @post, id:,:user_id, :body, :created_at
end
