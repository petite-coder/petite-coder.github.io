require 'net/http'
require 'uri'
require 'nokogiri'
require 'digest/md5'
require 'json'
require 'fileutils'

module Jekyll
  class LinkMentionTag < Liquid::Tag
    @@cache_dir = ".linkmention_cache"

    def initialize(tag_name, text, tokens)
      super
      @url = text.strip.gsub(/^\"|\"$/, '') # 양쪽 따옴표 제거
    end

    def render(context)
      return "❌ 유효하지 않은 링크" if @url.nil? || @url.empty?

      FileUtils.mkdir_p(@@cache_dir)
      cache_file = File.join(@@cache_dir, "#{Digest::MD5.hexdigest(@url)}.json")

      if File.exist?(cache_file)
        data = JSON.parse(File.read(cache_file))
      else
        data = fetch_preview_data(@url)
        File.write(cache_file, JSON.generate(data)) if data
      end

      return "❌ 데이터 추출 실패" unless data

      domain = URI.parse(@url).host rescue ''

      # ✅ HTML safe하게 멘션 스타일로 렌더링
      <<~HTML
        <a href="#{data["url"]}" class="mention-link" target="_blank">
          <img class="mention-icon" src="https://www.google.com/s2/favicons?sz=32&domain=#{domain}" alt="favicon">
          <span>#{data["title"]}</span>
        </a>
      HTML
    end

    private

    def fetch_preview_data(url)
      uri = URI.parse(url)
      html = Net::HTTP.get(uri)
      doc = Nokogiri::HTML(html)
    
      # ✅ HTML 태그 없는 순수 텍스트로 추출
      title = doc.at('title')&.text || uri.host
    
      clean_title = title
        .gsub(/\r?\n/, ' ')   # 줄바꿈 → 공백
        .squeeze(' ')         # 연속 공백 제거
        .strip
    
      {
        "url" => url,
        "title" => clean_title
      }
    rescue => e
      Jekyll.logger.warn "LinkMention fetch failed for #{url}: #{e}"
      nil
    end
  end
end

Liquid::Template.register_tag('linkmention', Jekyll::LinkMentionTag)
