require "test_helper"

class FrontendControllerTest < ActionDispatch::IntegrationTest
  test "renders the React app shell" do
    get root_path

    assert_response :success
    assert_select "div#root"
    assert_select "script[type=module]"
  end
end
