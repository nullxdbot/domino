package com.nullxd.dominocloud;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.GradientDrawable;
import android.net.Uri;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;
import java.io.IOException;
import java.io.InputStream;

public class NullXDDialog {
    
    private Context context;
    private Dialog dialog;
    private static final String PREFS_NAME = "NullXDDialogPrefs";
    private static final String KEY_DONT_SHOW = "dont_show_again";
    private Typeface bangAlbinFont;
    
    private static final String TELEGRAM_URL = "https://t.me/farrelauliairfealdo";
    private static final String YOUTUBE_URL = "https://youtube.com/@nullxd-md";
    private static final String INSTAGRAM_URL = "https://www.instagram.com/farrelauliairfealdo_";
    private static final String TIKTOK_URL = "https://www.tiktok.com/@farrel.aulia.irfealdo";
    private static final String JOIN_URL = "https://whatsapp.com/channel/0029VawFbp2CHDyfgcHIo51h";
    
    private static final int COLOR_BG_DIALOG = Color.parseColor("#151522");
    private static final int COLOR_BG_ACCENT = Color.parseColor("#1E1E2C");
    private static final int COLOR_PRIMARY = Color.parseColor("#8b5cf6");
    private static final int COLOR_SECONDARY = Color.parseColor("#ec4899");
    private static final int COLOR_TEXT = Color.parseColor("#f1f5f9");
    private static final int COLOR_TEXT_SEC = Color.parseColor("#94a3b8");
    private static final int COLOR_BORDER = Color.parseColor("#2A2A35");
    
    public NullXDDialog(Context context) {
        this.context = context;
        try {
            bangAlbinFont = Typeface.createFromAsset(context.getAssets(), "fonts/BangAlbin.ttf");
        } catch (Exception e) {
            bangAlbinFont = Typeface.DEFAULT;
        }
    }

    private Drawable getAssetImage(String filename) {
        try {
            InputStream ims = context.getAssets().open("img/" + filename);
            return Drawable.createFromStream(ims, null);
        } catch (IOException e) { return null; }
    }
    
    private void addClickEffect(View view) {
        view.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        v.animate().scaleX(0.96f).scaleY(0.96f).setDuration(80).start();
                        break;
                    case MotionEvent.ACTION_UP:
                    case MotionEvent.ACTION_CANCEL:
                        v.animate().scaleX(1f).scaleY(1f).setDuration(80).start();
                        break;
                }
                return false;
            }
        });
    }
    
    public void showMainDialog() {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        if (prefs.getBoolean(KEY_DONT_SHOW, false)) {
            return;
        }
        
        dialog = new Dialog(context);
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialog.setCancelable(true);
        
        LinearLayout mainLayout = new LinearLayout(context);
        mainLayout.setOrientation(LinearLayout.VERTICAL);
        mainLayout.setBackgroundDrawable(createBorderedBackground(COLOR_BG_DIALOG, COLOR_BORDER, 24));
        mainLayout.setPadding(dp(24), dp(24), dp(24), dp(24));
        
        mainLayout.addView(createHeader());
        mainLayout.addView(createWelcomeMessage());
        mainLayout.addView(createButtonGrid());
        mainLayout.addView(createDontShowCheckbox());
        mainLayout.addView(createBottomButtons());
        
        dialog.setContentView(mainLayout);
        setDialogAttributes(dialog);
        dialog.show();
    }
    
    private LinearLayout createHeader() {
        LinearLayout headerLayout = new LinearLayout(context);
        headerLayout.setOrientation(LinearLayout.HORIZONTAL);
        headerLayout.setGravity(Gravity.CENTER_VERTICAL);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.bottomMargin = dp(20);
        headerLayout.setLayoutParams(params);
        
        ImageView logo = new ImageView(context);
        LinearLayout.LayoutParams logoParams = new LinearLayout.LayoutParams(dp(54), dp(54));
        logoParams.rightMargin = dp(14);
        logo.setLayoutParams(logoParams);
        
        Drawable assetLogo = getAssetImage("logo.png");
        if (assetLogo != null) logo.setImageDrawable(assetLogo);
        else logo.setBackgroundDrawable(createCircleBackground(COLOR_PRIMARY));
        
        headerLayout.addView(logo);
        
        LinearLayout textContainer = new LinearLayout(context);
        textContainer.setOrientation(LinearLayout.VERTICAL);
        
        TextView nameText = new TextView(context);
        nameText.setText("NULLXD MODS 🇮🇩");
        nameText.setTextColor(COLOR_TEXT);
        nameText.setTextSize(19);
        nameText.setTypeface(bangAlbinFont);
        textContainer.addView(nameText);
        
        TextView subtitleText = new TextView(context);
        subtitleText.setText("Modder From Indonesia");
        subtitleText.setTextColor(COLOR_TEXT_SEC);
        subtitleText.setTextSize(12);
        textContainer.addView(subtitleText);
        
        headerLayout.addView(textContainer);
        return headerLayout;
    }
    
    private TextView createWelcomeMessage() {
        TextView welcomeText = new TextView(context);
        welcomeText.setText("Welcome bro, I hope the app I shared is useful. Please share it with your friends!");
        welcomeText.setTextColor(COLOR_TEXT);
        welcomeText.setTextSize(13);
        welcomeText.setLineSpacing(dp(3), 1.1f);
        
        welcomeText.setBackgroundDrawable(createBorderedBackground(COLOR_BG_ACCENT, Color.TRANSPARENT, 12));
        welcomeText.setPadding(dp(16), dp(16), dp(16), dp(16));
        
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.bottomMargin = dp(20);
        welcomeText.setLayoutParams(params);
        
        return welcomeText;
    }
    
    private LinearLayout createButtonGrid() {
        LinearLayout grid = new LinearLayout(context);
        grid.setOrientation(LinearLayout.VERTICAL);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.bottomMargin = dp(16);
        grid.setLayoutParams(params);
        
        LinearLayout row1 = new LinearLayout(context);
        row1.setOrientation(LinearLayout.HORIZONTAL);
        
        Button aboutBtn = createOutlinedButton("About Modder");
        aboutBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showAboutModderDialog(); }
        });
        
        Button changelogBtn = createOutlinedButton("Changelog");
        changelogBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showChangelogDialog(); }
        });
        
        LinearLayout.LayoutParams btnParams = new LinearLayout.LayoutParams(0, dp(44), 1f);
        btnParams.rightMargin = dp(8);
        aboutBtn.setLayoutParams(btnParams);
        
        LinearLayout.LayoutParams btnParams2 = new LinearLayout.LayoutParams(0, dp(44), 1f);
        changelogBtn.setLayoutParams(btnParams2);
        
        row1.addView(aboutBtn);
        row1.addView(changelogBtn);
        grid.addView(row1);
        
        Button socialBtn = createOutlinedButton("Social Media");
        socialBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { showSocialMediaDialog(); }
        });
        LinearLayout.LayoutParams socialParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(44));
        socialParams.topMargin = dp(10);
        socialBtn.setLayoutParams(socialParams);
        grid.addView(socialBtn);
        
        return grid;
    }
    
    private CheckBox createDontShowCheckbox() {
        CheckBox checkbox = new CheckBox(context);
        checkbox.setText("Don't show again");
        checkbox.setTextColor(COLOR_TEXT_SEC);
        checkbox.setTextSize(12);
        
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        params.bottomMargin = dp(20);
        checkbox.setLayoutParams(params);
        
        checkbox.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                prefs.edit().putBoolean(KEY_DONT_SHOW, isChecked).apply();
            }
        });
        return checkbox;
    }
    
    private LinearLayout createBottomButtons() {
        LinearLayout layout = new LinearLayout(context);
        layout.setOrientation(LinearLayout.HORIZONTAL);
        
        Button closeBtn = new Button(context);
        closeBtn.setText("CLOSE");
        closeBtn.setTextColor(Color.parseColor("#ff5252"));
        closeBtn.setTextSize(13);
        closeBtn.setTypeface(bangAlbinFont);
        closeBtn.setBackgroundDrawable(createBorderedBackground(Color.TRANSPARENT, Color.parseColor("#33ff5252"), 12));
        addClickEffect(closeBtn);
        closeBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { if (dialog != null) dialog.dismiss(); }
        });
        
        Button joinBtn = new Button(context);
        joinBtn.setText("JOIN NOW");
        joinBtn.setTextColor(Color.WHITE);
        joinBtn.setTextSize(13);
        joinBtn.setTypeface(bangAlbinFont);
        joinBtn.setBackgroundDrawable(createGradientBackground(COLOR_PRIMARY, COLOR_SECONDARY, 12));
        addClickEffect(joinBtn);
        joinBtn.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { openUrl(JOIN_URL); }
        });
        
        LinearLayout.LayoutParams p1 = new LinearLayout.LayoutParams(0, dp(48), 1f);
        p1.rightMargin = dp(10);
        closeBtn.setLayoutParams(p1);
        
        LinearLayout.LayoutParams p2 = new LinearLayout.LayoutParams(0, dp(48), 1.5f);
        joinBtn.setLayoutParams(p2);
        
        layout.addView(closeBtn);
        layout.addView(joinBtn);
        return layout;
    }
    
    private void showSocialMediaDialog() {
        final Dialog d = new Dialog(context);
        d.requestWindowFeature(Window.FEATURE_NO_TITLE);
        
        LinearLayout l = new LinearLayout(context);
        l.setOrientation(LinearLayout.VERTICAL);
        l.setBackgroundDrawable(createBorderedBackground(COLOR_BG_DIALOG, COLOR_BORDER, 24));
        l.setPadding(dp(24), dp(24), dp(24), dp(24));
        
        // Header dengan icon
        l.addView(createMiniHeader("Social Media"));
        
        // Description text
        TextView desc = new TextView(context);
        desc.setText("Follow me on social media for updates");
        desc.setTextColor(COLOR_TEXT_SEC);
        desc.setTextSize(12);
        desc.setGravity(Gravity.CENTER);
        LinearLayout.LayoutParams descParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        descParams.bottomMargin = dp(18);
        desc.setLayoutParams(descParams);
        l.addView(desc);
        
        // Grid 2x2 untuk social media
        LinearLayout grid = new LinearLayout(context);
        grid.setOrientation(LinearLayout.VERTICAL);
        LinearLayout.LayoutParams gridParams = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        gridParams.bottomMargin = dp(16);
        grid.setLayoutParams(gridParams);
        
        // Row 1: Telegram & YouTube
        LinearLayout row1 = new LinearLayout(context);
        row1.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams row1Params = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        row1.setLayoutParams(row1Params);
        row1.addView(createSocialBox("Telegram.png", "Telegram", "#229ED9", "#0088cc", TELEGRAM_URL));
        row1.addView(createSocialBox("YouTube.png", "YouTube", "#FF0000", "#cc0000", YOUTUBE_URL));
        grid.addView(row1);
        
        // Row 2: Instagram & TikTok
        LinearLayout row2 = new LinearLayout(context);
        row2.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams row2Params = new LinearLayout.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT, 
            ViewGroup.LayoutParams.WRAP_CONTENT
        );
        row2Params.topMargin = dp(8);
        row2.setLayoutParams(row2Params);
        row2.addView(createSocialBox("Instagram.png", "Instagram", "#E1306C", "#C13584", INSTAGRAM_URL));
        row2.addView(createSocialBox("TikTok.png", "TikTok", "#FFFFFF", "#999999", TIKTOK_URL));
        grid.addView(row2);
        
        l.addView(grid);
        
        Button close = createSimpleCloseButton(new View.OnClickListener() {
            @Override public void onClick(View v) { d.dismiss(); }
        });
        l.addView(close);
        
        d.setContentView(l);
        setDialogAttributes(d);
        d.show();
    }
    
    private LinearLayout createSocialBox(String img, String label, String gradStart, String gradEnd, final String url) {
        LinearLayout box = new LinearLayout(context);
        box.setOrientation(LinearLayout.VERTICAL);
        box.setGravity(Gravity.CENTER);
        box.setPadding(dp(12), dp(24), dp(12), dp(24));
        
        // Background dengan gradient
        int colorStart = Color.parseColor(gradStart);
        int colorEnd = Color.parseColor(gradEnd);
        box.setBackgroundDrawable(createGradientBackground(colorStart, colorEnd, 16));
        addClickEffect(box);
        
        // Layout params dengan margin yang sama
        LinearLayout.LayoutParams boxParams = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        boxParams.leftMargin = dp(4);
        boxParams.rightMargin = dp(4);
        box.setLayoutParams(boxParams);
        
        // Icon container dengan background circle putih
        LinearLayout iconContainer = new LinearLayout(context);
        iconContainer.setOrientation(LinearLayout.VERTICAL);
        iconContainer.setGravity(Gravity.CENTER);
        iconContainer.setPadding(dp(12), dp(12), dp(12), dp(12));
        iconContainer.setBackgroundDrawable(createCircleBackground(Color.WHITE));
        
        LinearLayout.LayoutParams iconContainerParams = new LinearLayout.LayoutParams(dp(56), dp(56));
        iconContainerParams.bottomMargin = dp(12);
        iconContainer.setLayoutParams(iconContainerParams);
        
        // Icon
        ImageView iv = new ImageView(context);
        Drawable d = getAssetImage(img);
        if (d != null) {
            iv.setImageDrawable(d);
        } else {
            // Fallback dengan warna solid
            iv.setBackgroundDrawable(createCircleBackground(colorStart));
        }
        LinearLayout.LayoutParams iconParams = new LinearLayout.LayoutParams(dp(32), dp(32));
        iv.setLayoutParams(iconParams);
        iconContainer.addView(iv);
        
        box.addView(iconContainer);
        
        // Label dengan shadow
        TextView tv = new TextView(context);
        tv.setText(label);
        tv.setTextColor(Color.WHITE);
        tv.setTextSize(13);
        tv.setTypeface(bangAlbinFont);
        tv.setGravity(Gravity.CENTER);
        tv.setShadowLayer(4, 0, 2, Color.parseColor("#40000000"));
        box.addView(tv);
        
        box.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) { openUrl(url); }
        });
        return box;
    }
    
    private void showChangelogDialog() {
        final Dialog d = new Dialog(context);
        d.requestWindowFeature(Window.FEATURE_NO_TITLE);
        LinearLayout l = new LinearLayout(context);
        l.setOrientation(LinearLayout.VERTICAL);
        l.setBackgroundDrawable(createBorderedBackground(COLOR_BG_DIALOG, COLOR_BORDER, 24));
        l.setPadding(dp(24),dp(24),dp(24),dp(24));
        
        l.addView(createMiniHeader("Changelog"));
        
        ScrollView s = new ScrollView(context);
        s.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, dp(220)));
        
        TextView t = new TextView(context);
        t.setText("v2.5 - Perfect Fit Layout\n\n" +
                  "• Fixed: Disable scroll - stay layout\n" +
                  "• Fixed: Music player overlay spacing\n" +
                  "• Improved: Ultra compact mode\n" +
                  "• Improved: Balanced spacing & sizing\n" +
                  "• Performance: All content fit 1 screen\n" +
                  "• Optimized: Button, card, font sizes\n\n" +
                  "Previous (v2.4):\n" +
                  "• New: TIM ALPHA → TIM NULLXD\n" +
                  "• Fixed: Traditional Domino Win Logic\n" +
                  "• Improved: Full Screen UI (1440x3200)\n" +
                  "• New: Compact Mode (Working)");
        t.setTextColor(COLOR_TEXT_SEC);
        t.setTextSize(13);
        t.setLineSpacing(dp(4), 1.1f);
        s.addView(t);
        l.addView(s);
        
        l.addView(createSimpleCloseButton(new View.OnClickListener() {
            @Override public void onClick(View v) { d.dismiss(); }
        }));
        
        d.setContentView(l);
        setDialogAttributes(d);
        d.show();
    }
    
    private void showAboutModderDialog() {
        final Dialog d = new Dialog(context);
        d.requestWindowFeature(Window.FEATURE_NO_TITLE);
        LinearLayout l = new LinearLayout(context);
        l.setOrientation(LinearLayout.VERTICAL);
        l.setBackgroundDrawable(createBorderedBackground(COLOR_BG_DIALOG, COLOR_BORDER, 24));
        l.setPadding(dp(24),dp(24),dp(24),dp(24));
        
        ImageView iv = new ImageView(context);
        LinearLayout.LayoutParams ip = new LinearLayout.LayoutParams(dp(72), dp(72));
        ip.gravity = Gravity.CENTER;
        ip.bottomMargin = dp(16);
        iv.setLayoutParams(ip);
        Drawable dImg = getAssetImage("logo2.png");
        if (dImg != null) iv.setImageDrawable(dImg);
        else iv.setBackgroundDrawable(createCircleBackground(COLOR_PRIMARY));
        l.addView(iv);
        
        TextView t = new TextView(context);
        t.setText("NullXD MODS 🇮🇩");
        t.setTextSize(18);
        t.setTypeface(bangAlbinFont);
        t.setTextColor(COLOR_TEXT);
        t.setGravity(Gravity.CENTER);
        l.addView(t);
        
        TextView st = new TextView(context);
        st.setText("Modder From Indonesia");
        st.setTextSize(12);
        st.setTextColor(COLOR_PRIMARY);
        st.setGravity(Gravity.CENTER);
        st.setPadding(0, 0, 0, dp(16));
        l.addView(st);
        
        TextView desc = new TextView(context);
        desc.setText("Modder Gabutzz and OtakuLovers 🌏\nHelping everyone to use apps for free.\n\nDon't forget to join our community!");
        desc.setTextColor(COLOR_TEXT_SEC);
        desc.setTextSize(13);
        desc.setGravity(Gravity.CENTER);
        desc.setLineSpacing(dp(3), 1.1f);
        l.addView(desc);
        
        l.addView(createSimpleCloseButton(new View.OnClickListener() {
            @Override public void onClick(View v) { d.dismiss(); }
        }));
        
        d.setContentView(l);
        setDialogAttributes(d);
        d.show();
    }

    private void setDialogAttributes(Dialog d) {
        if (d.getWindow() != null) {
            d.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
            d.getWindow().setLayout((int)(getScreenWidth() * 0.88), ViewGroup.LayoutParams.WRAP_CONTENT);
        }
    }
    
    private LinearLayout createMiniHeader(String titleText) {
        LinearLayout h = new LinearLayout(context);
        h.setOrientation(LinearLayout.HORIZONTAL);
        h.setGravity(Gravity.CENTER_VERTICAL);
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        p.bottomMargin = dp(16);
        h.setLayoutParams(p);
        
        ImageView iv = new ImageView(context);
        iv.setLayoutParams(new LinearLayout.LayoutParams(dp(28), dp(28)));
        Drawable d = getAssetImage("logo.png");
        if (d!=null) iv.setImageDrawable(d);
        h.addView(iv);
        
        TextView t = new TextView(context);
        t.setText(titleText);
        t.setTextSize(18);
        t.setTypeface(bangAlbinFont);
        t.setTextColor(COLOR_TEXT);
        t.setPadding(dp(12), 0, 0, 0);
        h.addView(t);
        return h;
    }
    
    private Button createOutlinedButton(String text) {
        Button b = new Button(context);
        b.setText(text);
        b.setTextColor(COLOR_TEXT);
        b.setTextSize(12);
        b.setBackgroundDrawable(createBorderedBackground(Color.TRANSPARENT, COLOR_BORDER, 12));
        addClickEffect(b);
        return b;
    }
    
    private Button createSimpleCloseButton(View.OnClickListener listener) {
        Button b = new Button(context);
        b.setText("CLOSE");
        b.setTextColor(COLOR_TEXT_SEC);
        b.setTextSize(12);
        b.setBackgroundDrawable(createBorderedBackground(Color.TRANSPARENT, Color.TRANSPARENT, 0));
        addClickEffect(b);
        LinearLayout.LayoutParams p = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, dp(40));
        p.gravity = Gravity.CENTER;
        p.topMargin = dp(12);
        b.setLayoutParams(p);
        b.setOnClickListener(listener);
        return b;
    }

    private GradientDrawable createBorderedBackground(int color, int borderColor, int radius) {
        GradientDrawable d = new GradientDrawable();
        d.setColor(color);
        d.setCornerRadius(dp(radius));
        if (borderColor != Color.TRANSPARENT) {
            d.setStroke(dp(1), borderColor);
        }
        return d;
    }
    
    private GradientDrawable createCircleBackground(int color) {
        GradientDrawable d = new GradientDrawable();
        d.setShape(GradientDrawable.OVAL);
        d.setColor(color);
        return d;
    }
    
    private GradientDrawable createGradientBackground(int startColor, int endColor, int radius) {
        GradientDrawable d = new GradientDrawable(GradientDrawable.Orientation.LEFT_RIGHT, new int[]{startColor, endColor});
        d.setCornerRadius(dp(radius));
        return d;
    }
    
    private void openUrl(String url) {
        try { context.startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); }
        catch (Exception e) { Toast.makeText(context, "Error", Toast.LENGTH_SHORT).show(); }
    }
    
    private int dp(int dp) {
        return (int) (dp * context.getResources().getDisplayMetrics().density);
    }
    
    private int getScreenWidth() {
        return context.getResources().getDisplayMetrics().widthPixels;
    }
}
