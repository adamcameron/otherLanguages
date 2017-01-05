(defproject my-stuff "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [clj-http "2.0.0"]]
  :profiles {:dev {:dependencies [[ring/ring-devel "1.4.0"]]}}
  :main my-stuff.core
  :aot [my-stuff.core])