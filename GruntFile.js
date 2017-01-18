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
            distributionName:   "iPhone Developer: Jenkins Bot (LLKM4W48ZV)"
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
        appc-cli:{
			dist-prod: {
	            'command': "run",
	            'args': [ 
	                '-p', 'ios',
	                '-T', 'dist-adhoc',
	                '-R', '<%= settings.distributionName %>',
	                '-P', '<%= settings.ppUuid %>',
	                '-O', './dist/prod/',
	                '--log-level', 'trace'
	            ]
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
    grunt.loadNpmTasks( "grunt-appc-cli"		);
    grunt.loadNpmTasks( "grunt-alloy"           );
    grunt.loadNpmTasks( "grunt-contrib-clean"   );
    grunt.loadNpmTasks( "grunt-shell"           );

    // Default task(s)
    //
    grunt.registerTask( "default",      [ "appc-cli:dist-prod","appc-cli:clean"] );
    grunt.registerTask( "coverage",     [] );
    grunt.registerTask( "ios-adhoc",    [ "appc-cli:ios_adhoc"      ] );
    grunt.registerTask( "ios",          [ "appc-cli:dev_ios"        ] );
};