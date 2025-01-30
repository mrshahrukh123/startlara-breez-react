<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    use HasFactory;
    use HasUuids;

    const TWITTER = 'twitter';
    const LINKEDIN = 'linkedin';
    const FACEBOOK = 'facebook';
    const INSTAGRAM = 'instagram';
    const PINTEREST = 'pinterest';
    const YOUTUBE = 'youtube';
    const TIKTOK = 'tiktok';
    const BLOGGER = 'blogger';
    const WORDPRESS = 'wordpress';
    const THREADS = 'threads';

    const POST_TYPE_TEXT = 'Text Post';
    const POST_TYPE_IMAGE = 'Image Post';
    const POST_TYPE_VIDEO = 'Video Post';
    const POST_TYPE_REEL = 'Reel Post';
    const POST_TYPE_STORY = 'Story Post';
    // facebook token use for instagram and facebook pages
    const FACEBOOK_REFRESH_TOKEN_DAYS = 58;
    const PINTEREST_REFRESH_TOKEN_DAYS = 30;
    const LINKEDIN_REFRESH_TOKEN_DAYS = 58;
    const BLOGGER_REFRESH_TOKEN_DAYS = 58;
    const THREADS_REFRESH_TOKEN_DAYS = 58;

    // All account Credential
    const FACEBOOK_CLIENT_ID = 1151359232917833;
    const FACEBOOK_CLIENT_SECRET = '288f3ebf085c44dd3d32dceafae44d62';
    const FACEBOOK_REDIRECT_URL = 'https://social-pub.local/facebook/callback';
    const FACEBOOK_SCOPES = 'email,public_profile,pages_manage_engagement,pages_manage_metadata,pages_manage_posts,pages_read_engagement,pages_show_list,publish_video,';

    const INSTAGRAM_CLIENT_ID = 1151359232917833;
    const INSTAGRAM_CLIENT_SECRET = '288f3ebf085c44dd3d32dceafae44d62';
    const INSTAGRAM_REDIRECT_URL = 'https://social-pub.local/facebook/callback';
    const INSTAGRAM_SCOPES = 'email,public_profile,pages_show_list,ads_management,business_management,instagram_basic,instagram_content_publish,pages_read_engagement';

    const PINTEREST_CLIENT_ID = 1501035;
    const PINTEREST_CLIENT_SECRET = 'ef30f5c0805da0f9f1d754891a160adff0e68542';
    const PINTEREST_REDIRECT_URL = 'https://social-pub.local/pinterest/callback';
    const PINTEREST_SCOPES = 'user_accounts:read,boards:write,boards:read,pins:write,pins:read,';

    const LINKEDIN_CLIENT_ID = '78wnzu5yfs7qmf';
    const LINKEDIN_CLIENT_SECRET = 'BMd9IhtwyoQr2hkM';
    const LINKEDIN_REDIRECT_URL = 'https://social-pub.local/auth/linkedin/callback';
    const LINKEDIN_SCOPES = 'r_basicprofile,email,w_organization_social,w_member_social,profile,openid,rw_ads';

    const YOUTUBE_CLIENT_ID = '435799135781-6qvgfloturgt64d8ptiasgmf16nspiab.apps.googleusercontent.com';
    const YOUTUBE_CLIENT_SECRET = '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';
    const YOUTUBE_REDIRECT_URL = 'https://social-pub.local/youtube/callback';
    const YOUTUBE_SCOPES = 'https://www.googleapis.com/auth/youtube.upload,https://www.googleapis.com/auth/youtube';

    const TIKTOK_CLIENT_ID = 'sbawuz7xmtmljqt11n';
    const TIKTOK_CLIENT_SECRET = 'zyYGZNJFTBSF5GHLzPSoCymTi3iYh54b';
    const TIKTOK_REDIRECT_URL = 'https://social-pub.local/tiktok/callback';
    const TIKTOK_SCOPES = 'user.info.profile';

    const BLOGGER_CLIENT_ID = '784886486798-ijj2hfprj0jrbbjkatl6qlrtl6j37r40.apps.googleusercontent.com';
    const BLOGGER_CLIENT_SECRET = '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';
    const BLOGGER_REDIRECT_URL = 'http://127.0.0.1:8000/auth/blogger/callback';
    const BLOGGER_SCOPES = 'https://www.googleapis.com/auth/blogger';

    const WORDPRESS_CLIENT_ID = '111096';
    const WORDPRESS_CLIENT_SECRET = 'oRst6sSWKIcOTOXAPE3wNQ81NdANElLlzwVZVbdx17PFbpy9zko8lueoFIWMxkYA';
    const WORDPRESS_REDIRECT_URL = 'http://127.0.0.1:8000/auth/wordpress/callback';
    const WORDPRESS_SCOPES = 'global'; //post

    const THREADS_CLIENT_ID = '1190233452497273';
    const THREADS_CLIENT_SECRET = 'b9943169014362a0b40547cd91b76b60';
    const THREADS_REDIRECT_URL = 'https://social-pub.local/threads/callback';
    const THREADS_SCOPES = 'threads_basic,threads_content_publish';

    protected $fillable = [
        'id',
        'name',
        'account_id',
        'access_token',
        'refresh_token',
        'account_type_id',
    ];

    protected $casts = ['relationName.pivot.id' => 'string'];

    public function user()
    {
        // return $this->belongsToMany(User::class, 'user_social_accounts', 'social_account_id', 'user_id');
        return $this->belongsToMany(User::class, 'social_account_user');
    }

    public function accountType()
    {
        return $this->belongsTo(AccountType::class);
    }

    // public function social_items()
    // {
    //     return $this->hasMany(SocialItems::class);
    // }
}
