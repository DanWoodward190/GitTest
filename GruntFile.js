module.exports = function( grunt )
{
    // Project configuration.
    //
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON( "package.json" ),

        settings:
        {
            ppUuid:             "15717f03-7b6b-4885-ae42-07493750acc4",
            distributionName:   "Git Test"
        },

        clean:
        {
            dist:
            {
                src: [ "dist" ]
            },

            coverage:
            {
                src: [ "dist/coverage" ]
            }
        },

        titanium:
        {
            build_ios:
            {
                options:
                {
                    command:    "build",
                    projectDir: ".",
                    platform:   "ios",
                    buildOnly:  true,
                }
            },
            ios_adhoc: {
                options:
                {
                    command:    "build",
                    projectDir: ".",
                    platform:   "ios",
                    target:     "dist-adhoc",
                    buildOnly:  true,
                    distributionName: "<%= settings.distributionName %>",
                    ppUuid: "<%= settings.ppUuid %>",
                    outputDir: "./dist/artifacts"
                }
            },
            ios_store: {
                options:
                {
                    command:    "build",
                    projectDir: ".",
                    platform:   "ios",
                    target:     "dist-appstore",
                    buildOnly:  true,
                    distributionName: "<%= settings.distributionName %>",
                    ppUuid: "<%= settings.ppUuid %>",
                    outputDir: "./dist/artifacts"
                }
            },
            dev_ios:
            {
                options:
                {
                    command:    "build",
                    args:       "--shadow",
                    projectDir: ".",
                    platform:   "ios",
                    buildOnly:  false,
                }
            },
            clean:
            {
                options:
                {
                    command:    "clean",
                    projectDir: "."
                }
            }
        }
    } );

    // Load the required plug-ins
    //
    grunt.loadNpmTasks( "grunt-titanium"        );
    grunt.loadNpmTasks( "grunt-alloy"           );
    grunt.loadNpmTasks( "grunt-contrib-clean"   );
    grunt.loadNpmTasks( "grunt-shell"           );

    // Default task(s)
    //
    grunt.registerTask( "default",      [ "titanium:ios_adhoc"] );
    grunt.registerTask( "coverage",     [] );
    grunt.registerTask( "ios-adhoc",    [ "titanium:ios_adhoc"      ] );
    grunt.registerTask( "ios",          [ "titanium:dev_ios"        ] );
};