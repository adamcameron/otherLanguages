(ns quiz.core-test (:require
	[clojure.test :refer :all]
	[quiz.core :refer :all]
	[clojure.string :as string]
))

(deftest a-test(
	testing "that main outputs the correct message"
	(def message (string/trim (with-out-str (-main))))
	(is (= "G'day, world!" message))
))
