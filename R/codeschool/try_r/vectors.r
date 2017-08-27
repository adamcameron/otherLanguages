c(4, 7, 9)
c('a', 'b', 'c')
c(1, TRUE, "three")
5:9
seq(5,9)
seq(5, 9, 0.5)
9:5
sentence <- c('walk', 'the', 'plank')
sentence[3]
sentence[1]
sentence[3] <- "dog"
sentence
sentence[4] <- 'to'
sentence
sentence[c(1, 3)]
sentence[2:4]
sentence[4:2]
sentence[5:7] <- c('the', 'poop', 'deck')
sentence
sentence[6]

ranks <- 1:3
names(ranks) <- c("first", "second", "third")
ranks["first"]
ranks["third"] <- 4
ranks
