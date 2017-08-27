matrix(0, 3, 4)
a <- 1:12
print(a)
matrix(a, 3, 4)
matrix(a, 2, 6)

plank <- 1:8
plank

dim(plank) <- c(4, 2)
plank

dim(plank) <- c(2, 4)
plank

matrix(1, 5, 5)

plank[2, 3]
plank[1, 4]

plank[1, 4] <- 0
plank[1, 4]

plank
plank[2,]
plank[,2]
plank[, 2:4]
