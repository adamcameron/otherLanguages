(ns tdd.baseline-test
	(:require
		[clojure.test :refer :all]
		[tdd.baseline :refer :all]
	)
)

(deftest baseline-test
	(
		testing "Test a function call"
		(is (= "G'day world" (greet)))
	)
)
