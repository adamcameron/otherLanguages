(ns quiz.misc-test
	(:require
		[clojure.test :refer :all]
		[quiz.misc :refer :all]
	)
)

(deftest f-test(
	testing "basic function"
	(is (= 4 (f 2)))
))
