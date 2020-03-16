class Api <  ApplicationRecord

    def self.request_api 
        resp = Typhoeus.get("https://www.themealdb.com/api/json/v1/1/search.php?f=c")
        results = JSON.parse(resp.response_body)
    end
end
