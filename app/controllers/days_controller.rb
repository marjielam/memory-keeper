class DaysController < ApplicationController
  before_filter :authenticate_user!
end
