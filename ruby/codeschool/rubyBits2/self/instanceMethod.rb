class Post
  attr_writer :title

  def print_title
    puts "The title of this post is #{@title}"
  end

  def self.print_author
    puts "The author of all posts is Jimmy"
  end


end

pst = Post.new
pst.title = "Green Beans"
pst.print_title
Post.print_author
# "The title of this post is Green Beans"