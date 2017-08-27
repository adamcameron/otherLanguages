targets = read.csv("targets.csv")
infantry = read.table("infantry.txt", sep="\t", header=TRUE)
merge(x = targets, y = infantry)
