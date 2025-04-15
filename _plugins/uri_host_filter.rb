require 'uri'

module Jekyll
  module UriHostFilter
    def uri_host(input)
      URI.parse(input).host rescue ""
    end
  end
end

Liquid::Template.register_filter(Jekyll::UriHostFilter)
