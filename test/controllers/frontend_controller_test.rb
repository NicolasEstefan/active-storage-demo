require "test_helper"

class FrontendControllerTest < ActionDispatch::IntegrationTest
  test "renders the React app shell" do
    get root_path

    assert_response :success
    assert_select "div#root"
    assert_select "script[type=module]"
  end

  test "renders the React app shell for a recipe page requested by a browser" do
    get "/recipes/#{recipes(:one).id}", headers: { "Accept" => "text/html,application/xhtml+xml,*/*;q=0.8" }

    assert_response :success
    assert_select "div#root"
  end

  test "keeps serving recipe JSON to API clients" do
    get "/recipes/#{recipes(:one).id}", headers: { "Accept" => "application/json" }

    assert_response :success
    assert_equal recipes(:one).title, response.parsed_body["title"]
  end
end
